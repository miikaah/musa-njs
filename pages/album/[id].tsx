import type { GetServerSidePropsContext } from "next";
import Link from "next/link";

const { CORE_API_URL: baseUrl } = process.env;

type Album = {
  id: string;
  coverUrl: string;
  files: Track[];
  metadata: {
    album: string;
    artist: string;
    artists: string[];
    dynamicRangeAlbum: string;
    genre: string[];
    year: number;
  };
};

type Track = {
  id: string;
  name: string;
  fileUrl: string;
};

type Props = {
  album: Album;
};

const Album = ({ album }: Props) => {
  const { coverUrl, metadata } = album;
  const { album: name, artist, genre, year } = metadata;

  console.log(album);

  return (
    <>
      <div>
        <img src={coverUrl} width={100} height={100} />
        <span>{artist}</span>
        <span>{" - "}</span>
        <span>{name}</span>
        <span>{" - "}</span>
        <span>{year}</span>
        <span>{" - "}</span>
        <span>{genre.join(", ")}</span>
      </div>
      <div>
        {album.files.map(({ name, id, fileUrl }) => {
          return (
            <div key={id}>
              <a href={fileUrl} target="_blank">
                {name}
              </a>
              <Link href={`/audio/${id}`}>{">"}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

type Params = { id: string };

export async function getServerSideProps(context: GetServerSidePropsContext<Params>) {
  const { id } = context.params as Params;
  const res = await fetch(`${baseUrl}/album/${id}`);
  const album: Album = await res.json();

  return {
    props: {
      album,
    },
  };
}

export default Album;
