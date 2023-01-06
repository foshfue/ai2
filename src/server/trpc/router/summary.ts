import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "../../../env/server.mjs";
import { Console } from "console";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

async function summarizeVideo(transcript: string) {
  console.log("summarize video IN");
  const openai = new OpenAIApi(configuration);
  // Divide the transcript into chunks of no more than 4000 characters each

  const words = transcript.split(" ");

  const chunkSize = 2500;
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    // console.log("summarize video -chunks");
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }

  // console.log("chunks leg", chunks.length);

  // console.log("chunks", chunks);

  // Summarize each chunk using the text-davinci-003 model
  const summaries = [];
  for (const chunk of chunks) {
    console.log("summarize video - getting summary");
    const summary = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `Summarize this Youtube Video transcript for a second-grade student with more than 200 words:
  
      Text: ${chunk}
  
      Summary of video:
      `,
        temperature: 0.7,
        max_tokens: 1200,
        top_p: 1.0,
        frequency_penalty: 0.25,
        presence_penalty: 0.1,
      })
      .catch((error) => {
        console.log("error", error);
      });
    // console.log("summary", summary);

    // console.log("summary 22", summary?.data?.choices[0]?.text);
    // console.log("summary", JSON.stringify(summary?.data?.choices[0]));
    summaries.push(summary?.data?.choices[0]?.text);
  }

  console.log("joint", summaries);
  return summaries.join(" ");
}

// export async function getSummaryAI({ prompt }: { prompt: string }) {
//   //entred openAI

//   console.log("open AI");
//   const openai = new OpenAIApi(configuration);

//   const response = await openai.createCompletion(openAIPrompt(prompt));

//   console.log(
//     "response123",
//     JSON.stringify(response.data.choices[0]?.text, null, 2)
//   );
//   return response.data.choices[0]?.text;
// }

const getSubTitles = async (videoId: string) => {
  try {
    const response = await fetch(
      `https://subtitles-for-youtube.p.rapidapi.com/subtitles/${videoId}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "ab627a5541msh6ecc9af506b5d00p146771jsn7cea8ffe6c19",
          "X-RapidAPI-Host": "subtitles-for-youtube.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    // @ts-expect-error:next-line
    const mergedText = data.map((item) => item.text).join(" ");
    return mergedText;
  } catch (error) {
    console.error(error);
    return new Error("No transcript found");
  }
};

export const summaryRouter = router({
  getCost: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { videoId } = input;

      const mergedText = await getSubTitles(videoId);

      if (mergedText.length > 50) {
        const words = mergedText.split(" ");
        const chunkSize = 2500;
        const chunkValue = Math.round(words.length / chunkSize);

        return chunkValue + 1;
      }
      return 0;
    }),

  getSummary: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { videoId } = input;

      const dbTranscript = await ctx.prisma.transcript.findUnique({
        where: {
          videoId,
        },
      });

      //if transcript is not in db
      if (!dbTranscript) {
        console.log("no transcript in db");

        //get transcript from api
        const subTitles = await getSubTitles(videoId);

        const addTranscript = await ctx.prisma.transcript.create({
          data: {
            text: await getSubTitles(videoId),
            videoId: videoId,
          },
        });
        console.log("addTranscript added");

        if (subTitles.length > 50) {
          const words = subTitles.split(" ");
          const chunkSize = 2500;
          const chunkValue = Math.round(words.length / chunkSize);

          const sumarized = await summarizeVideo(subTitles);
          if (sumarized.length > 50) {
            const coinUpdate = await ctx.prisma.user.update({
              where: {
                id: ctx.session.user.id,
              },
              data: {
                coins: {
                  decrement: chunkValue,
                },
              },
            });

            const summary = await ctx.prisma.summary.create({
              data: {
                text: sumarized,
                videoId: videoId,
                userId: ctx.session.user.id,
              },
            });
          }
          return sumarized;
        }
      } else {
        console.log("transcript in db");
        const sumarized = await summarizeVideo(dbTranscript.text);
        if (sumarized.length > 50) {
          const coinUpdate = await ctx.prisma.user.update({
            where: {
              id: ctx.session.user.id,
            },
            data: {
              coins: {
                decrement: 1,
              },
            },
          });

          const summary = await ctx.prisma.summary.create({
            data: {
              text: sumarized,
              videoId: videoId,
              userId: ctx.session.user.id,
            },
          });
        }
        return sumarized;
      }
    }),

  getSummaryById: protectedProcedure
    .input(z.object({ summaryId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { summaryId } = input;

      const summary = await ctx.prisma.summary.findMany({
        where: {
          videoId: summaryId,
          userId: userId,
        },

        include: {
          video: true,
        },
      });
      if (!summary) throw new Error("Summary not found");

      return summary;
    }),
});
