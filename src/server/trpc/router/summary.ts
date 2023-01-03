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

export const summaryRouter = router({
  getCost: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { videoId } = input;
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

        const mergedText = data.map((item) => item.text).join(" ");
        if (mergedText.length > 50) {
          try {
            const words = mergedText.split(" ");

            const chunkSize = 2500;
            const chunkValue = Math.round(words.length / chunkSize);

            return chunkValue;
          } catch (error) {
            // console.error("error geldi", error);
            return error;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }),

  getSummary: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { videoId } = input;

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

        const mergedText = data.map((item) => item.text).join(" ");
        if (mergedText.length > 50) {
          try {
            console.log("merged text in");
            const words = mergedText.split(" ");

            const chunkSize = 2500;
            const chunkValue = Math.round(words.length / chunkSize);

            const sumarized = await summarizeVideo(mergedText);

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
            }
 
            console.log("sumarized", sumarized);
            // if (mergedText.split(" ").length > chunkSize) {
            //   console.log("merged text inside");

            //   const chunks = [];

            //   for (let i = 0; i < mergedText.length; i += chunkSize) {
            //     console.log("chunks");
            //     //TODO: 1-2 kelime geriden ekle sonra
            //     chunks.push(mergedText.slice(i, i + chunkSize));
            //   }
            //   const summaries = [];
            //   for (const chunk of chunks) {
            //     console.log("summaries");
            //     const sum = await getSummaryAI({ prompt: chunk });
            //     summaries.push(sum);
            //     console.log("summarİes", summaries);
            //     return summaries.join(" ");
            //   }

            //   return "The text is too long to summarize. Please try another video.";
            // }

            // console.log(
            //   "text passed with lenght:" + mergedText.split(" ").length
            // );

            // const sum = await getSummaryAI({ prompt: mergedText });
            // console.log("merged text outside", sum);
            // // console.log("sum sum sum", sum);
            // return sum;
            return sumarized;
          } catch (error) {
            // console.error("error geldi", error);
            return error;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }),
});
