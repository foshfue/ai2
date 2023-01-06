import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

// export async function getVideoInfo({ videoId }: { videoId: string }) {
//   const videoData = await fetch(
//     `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCpvQ5GDVHFbB3uNVEZnNlP-67RXZKp-Xw&part=snippet&id=${videoId}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     })
//     .catch((e) => {
//       console.log("google fetch error", e);
//     });

//   const { title, thumbnails, channelTitle } = videoData?.items?.[0]?.snippet;

//   console.log(
//     "datas",
//     thumbnails?.standard?.url,
//     channelTitle,
//     thumbnails?.high?.height,
//     videoId
//   );
//   return { title, thumbnails, channelTitle };
// }

export const videoRouter = router({
  getVideoHistory: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    console.log("user Id check", userId);
    try {
      const result = await ctx.prisma.searchHistory.findMany({
        distinct: ["videoId"],
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
        include: {
          video: true,
        },
      });
      console.log("result", result);
      return result;
    } catch (e) {
      console.log("error inside", e);
    }
  }),

  getVideo: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { videoId } = input;
      console.log("video Id check", videoId);
      console.log("user Id check", userId);
      try {
        const result = await ctx.prisma.video.findUnique({
          where: {
            youtubeId: videoId,
          },
        });
        console.log("result", result);
        if (result) {
          const searchLogAdd = await ctx.prisma.searchHistory
            .create({
              data: {
                videoId: result.youtubeId + "",
                userId: userId,
              },
            })
            .catch((e) => {
              console.log("searchLogAdd error", e);
            });
          console.log("searchLogAdd", searchLogAdd);
          return result;
        }
        if (result === null) {
          const videoData = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCpvQ5GDVHFbB3uNVEZnNlP-67RXZKp-Xw&part=snippet&id=${videoId}`
          )
            .then((res) => res.json())
            .then((data) => {
              return data;
            })
            .catch((e) => {
              console.log("google fetch error", e);
            });

          const { title, thumbnails, channelTitle } =
            videoData?.items?.[0]?.snippet;
          try {
            if (videoData) {
              const newVideo = await ctx.prisma.video.create({
                data: {
                  youtubeId: videoId,
                  title: title,
                  thumbnail: thumbnails?.maxres?.url,
                  channel: channelTitle,
                  width: thumbnails?.high?.width,
                  height: thumbnails?.high?.height,
                  url: `https://www.youtube.com/watch?v=${videoId}`,
                  imageUrl: thumbnails?.maxres?.url,
                },
              });
              console.log("newVideo", newVideo);
              return newVideo;
            }
          } catch (e) {
            console.log("database create erorr", e);
          }
          // console.log("video Data", videoData.items[0].snippet);
        }
      } catch (e) {
        console.log("error inside", e);
      }
    }),
});
