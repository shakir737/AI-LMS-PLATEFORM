import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import CourseData from "@/components/CourseDataComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string}>;
}

const Course = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();

    const { name, courseCategory, subCategory, duration, courseData, chapter } = companion;
    let chapters = [];
    chapters= courseData.Chapters;
    console.log(courseData);
    if(!user) redirect('/sign-in');
    if(!name) redirect('/companions');

    return (
        <main>
            <article className="flex flex-col rounded-border p-2">
              <div className="flex w-full items-center justify-center">
                          <p className="text-lg font-bold text-xl">Course Title: {subCategory}</p>
              </div>
              <div className="flex justify-between gap-2">
                <div className="flex justify-between gap-2">
                      <div className=" flex items-center justify-center size-[72px] flex  rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(courseCategory)}}>
                        <Image src={`/icons/${courseCategory}.svg`} alt={courseCategory} width={35} height={35} />
                          
                   </div>

                     <div className="flex flex-row gap-10 justify-center items-center text-2xl">
                         Student Name: 
                            <p className="font-bold ">
                              {name}
                            </p>
                              Course Category:
                            <div className="font-bold ">
                               {courseCategory}
                            </div>
                        </div>
                </div>
                  
                 
                        <div className="flex justify-center items-center text-2xl max-md:hidden">
                            Course Duration: {duration} Hourse
                        </div>
                    
               </div>
             
            </article>

          
            <section className="w-full h-full">
                <div className="course-section p-2">
                    <div className="text-xl ">{courseData.Description}</div>
                 <div className="flex justify-center items-center font-bold text-3xl"> Course Detail</div>
                        
                   <CourseData id={id} chapters={chapters} chapter={chapter} subCategory={subCategory} courseDuration={duration} />
                           
                 </div>

                      
                   
                  

             
            </section>
      
        </main>
    )
}

export default Course
