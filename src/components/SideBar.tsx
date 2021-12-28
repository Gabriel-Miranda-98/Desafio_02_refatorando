import { Button } from './Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
interface sidebarProps{
  selectedGenreId:number;
   GenreId : Function;
}


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}




export function SideBar(props : sidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  useEffect(() => {
  api.get<GenreResponseProps[]>('genres').then(response => {
    setGenres(response.data);
  });
}, []);

function handleClickButton(id: number) {
  props.GenreId(id);
  }



  return(
  <nav className="sidebar">
  <span>Watch<p>Me</p></span>

  <div className="buttons-container">
    {genres.map(genre => (
      <Button
        key={String(genre.id)}
        title={genre.title}
        iconName={genre.name}
        onClick={() => handleClickButton(genre.id)}
        selected={props.selectedGenreId === genre.id}
      />
    ))}
  </div>
</nav>);
}