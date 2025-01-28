
import { IconStarFilled } from '@tabler/icons-react';
import Link from "next/link";



export default function Favorito() {
  return (
    <Link href="/favorito">
      <div className="flex gap-1">
        <IconStarFilled size={22} stroke={1} />
        
        <div className="md:flex hidden">Favoritos</div>
      </div>
    </Link>
  )
}