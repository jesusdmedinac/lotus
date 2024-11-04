import Image from "next/image";

export default function SuggestedTeachers() {
  
  return (
    <div className="flex flex-col w-full justify-start">
      <div className="flex overflow-x-scroll">
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
      </div>
    </div>
  )
}

function TeacherCard() {
  return (
    <div className="flex flex-none flex-col rounded-lg bg-[#00000080] m-2">
      <Image 
        src={"https://static.platzi.com/cdn-cgi/image/width=480,quality=50,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_671965faa77b0fd7513b88ff_671965faa77b0fd7513b8910_34s.jpg"}
        alt="Teacher"
        width={480}
        height={270}
        className="aspect-video rounded-lg w-96"
      />
      <div className="flex flex-row w-full justify-start p-4 cursor-pointer">
        <div className="rounded-full bg-slate-200 size-10">
        </div>
        <div className="flex flex-col w-full pl-2">
          <p className="font-semibold">Carli Code</p>
          <p>Teacher In-house en Platzi</p>
        </div>
      </div>
    </div>
  )
}