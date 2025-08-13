import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string, topic: string}>;
    searchParams:any
}

const CompanionSession = async ({ params, searchParams }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();
    const topic = (await searchParams).topic;
    const topicDuration = ( await searchParams).duration;
    const { name, courseCategory, subCategory, } = companion;

    if(!user) redirect('/sign-in');
    if(!name) redirect('/companions')

    return (
        <main>
          <article className="flex flex-col rounded-border p-2">
                        <div className="flex w-full  justify-between gap-4 ">
                                    <div className="flex justify-row gap-4 text-lg text-xl">Course Title:
                                        <p className="font-bold">{subCategory}</p> </div>
                                     <div className="flex justify-row gap-2 text-lg text-xl">Subject Title:
                                        <p className="font-bold">{topic}</p> </div>
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
                                      Topic Duration: {topicDuration}
                                  </div>
                              
                         </div>
                       
                      </article>
            <CompanionComponent
                topic={topic}
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
                topicDuration={topicDuration}
            />
        </main>
    )
}

export default CompanionSession
