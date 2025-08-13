"use client";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface CompanionCardProps {
  id: string;
  chapters: [];
  chapter: number;
  subCategory: string;
  courseDuration: number;
}

const CourseData = ({
 id,
 chapters,
 chapter,
 subCategory,
 courseDuration,
}: CompanionCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (content:any, courseDuration: any, chapter: any) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const total = chapter * 4;
    const duration = courseDuration * 60 / total;
    const contentReplaced = content.replace('.',"");
    currentParams.set("topic", `${contentReplaced} in ${subCategory}`);
    currentParams.set("duration", (duration).toString());
    router.push(`/companions/${id}?${currentParams.toString()}`);
  };
  
  return (
    <article >
      {chapters.map((chapters:any, index:any) => (
                        <div key={index}>
                            <div className="flex flex-col items-start">
                              <div className="text-2xl ">
                                 Chapter {index+1}
                                
                              </div>
                               <div>
                                { chapters.Content.map((content:any, index:any) => (

                                        <div key={index} className="font-bold hover:underline hover:bg-gray-300">
                                            <button onClick={() => updateSearchParams(content, courseDuration, chapter)}>
                                              {content}
                                            </button>
                                           
                                        </div>
                                )) } 
                               </div> 
                            </div>
                        </div>
                       ))} 
       
    </article>
  );
};

export default CourseData;
