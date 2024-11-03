import Person2Icon from '@mui/icons-material/Person2';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CommentIcon from '@mui/icons-material/Comment';
import Image from 'next/image';

export default function LearningProfile() {
  return (
    <div className='flex flex-col w-full justify-start'>
      <div className="flex flex-row w-full justify-start items-center">
        <Person2Icon
          className='rounded-full bg-primary text-on-primary p-4 size-16'
        />
        <div className='flex flex-col w-full justify-center p-4'>
          <p className='text-xl'>
            Nombre de usuario
          </p>
          <p className='text-lg'>
            correo electrónico
          </p>
        </div>
      </div>
      <div className='flex flex-row justify-start items-center'>
        <div className='flex-auto flex flex-row justify-start items-center p-4 m-2 rounded-lg bg-[#1E2229]'>
          <WatchLaterIcon 
            className='rounded-xl p-2 size-12 bg-[#FF9800] text-[#00000080]'
          />
          <div className='flex flex-col w-full pl-2 font-semibold'>
            <p>1 h 2 m</p>
            <p>Aprendido</p>
          </div>
        </div>
        <div className='flex-auto flex flex-row justify-start items-center p-4 m-2 rounded-lg bg-[#1E2229]'>
          <PlayArrowIcon 
            className='rounded-xl p-2 size-12 bg-[#9C27B0] text-[#00000080]'
          />
          <div className='flex flex-col w-full pl-2 font-semibold'>
            <p>2 clases</p>
            <p>Progreso</p>
          </div>
        </div>
        <div className='flex-auto flex flex-row justify-start items-center p-4 m-2 rounded-lg bg-[#1E2229]'>
          <Image
            width={32}
            height={32}
            src={"/lotus-on-blue.svg"}
            alt="Lotus icon"
            className='rounded-xl p-2 size-12 bg-[#2196F3]'
          />
          <div className='flex flex-col w-full pl-2 font-semibold'>
            <p>2 h 39 m</p>
            <p>Reintentar examen</p>
          </div>
        </div>
        <div className='flex-auto flex flex-row justify-start items-center p-4 m-2 rounded-lg bg-[#1E2229]'>
          <CommentIcon 
            className='rounded-xl p-2 size-12 bg-[#4CAF50] text-[#00000080]'
          />
          <div className='flex flex-col w-full pl-2 font-semibold'>
            <p>2 respuestas</p>
            <p>Comentarios</p>
          </div>
        </div>
      </div>
    </div>
  )
}