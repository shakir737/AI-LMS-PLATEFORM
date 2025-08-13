import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";



export async function POST(request: Request) {

   const { name, voice, style, courseCategoryType, courseCategory, level, subCategory, chapter, duration} = await request.json();
   const { userId } = await auth();
   const supabase = createSupabaseClient();
   const user = userId?.toString();
  try {
    const { text: courseMaterial } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare course on given role.
        The job role is ${courseCategory}.
        The job experience level is ${level}.
        The tech stack used in the job is ${subCategory}.
        The focus between behavioural and technical course should lean to ${courseCategoryType}.
        The amount of chapters required is ${chapter}.
        The course duration is about to ${duration} hours.
        The questions are going to be read by a voice assistant so do not use "/" , "*", backtick or any other
        special characters which might break the voice assistant.
        Return the course formatted like this in a json format:
        {"Description",{"chapter 1"}, {"chapter 2"}, {"chapter 3"}}
        Thank you! <3
    `,
    });
    let result = {};
 try {
  const replacedString1 = courseMaterial.replace('```','');
  const replacedString = replacedString1.replace('```','');
  const replacedjson = replacedString.replace('json','');

  const jsonObject = JSON.parse(replacedjson);
  result = jsonObject

 } catch (error) {
  console.error("Error parsing JavaScript object text:", error);
 }
   

   const courseData =  result;
   const {data, error} = await supabase.from("companions").insert({
    name: name,
    courseCategory: courseCategory,
    subCategory: subCategory,
    voice: voice,
    style: style,
    duration: duration,
    userId: user,
    level: level,
    chapter: chapter,
    subCategoryType: courseCategoryType,
    courseData: courseData,
   }).select();
if (error){
    throw new Error(error.message)
};
    

    return Response.json({ success: true, data: data },  { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
