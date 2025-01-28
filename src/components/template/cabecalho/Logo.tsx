
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href="/">
            <div className='flex flex-col items-center p-3'>
                <div className='text-lg leading-5 font-semibold text-black'>React</div>
                <div className='text-lg leading-5 text-black font-semibold'>Food</div>
                
            </div>
        </Link>
    )
}
