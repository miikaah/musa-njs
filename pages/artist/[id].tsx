import type { GetServerSidePropsContext } from "next";
import Link from "next/link";

const { CORE_API_URL: baseUrl } = process.env;

type Artist = {
  name: string;
  albums: Album[];
};

type Album = {
  id: string;
  coverUrl: string;
  name: string;
};

type Props = {
  artist: Artist;
};

const Artist = ({ artist }: Props) => {
  const { name } = artist;

  console.log(artist);

  return (
    <>
      <div>{name}</div>
      <div>
        {artist.albums.map(({ coverUrl, name, id }) => {
          return (
            <div key={id}>
              <img src={coverUrl} width={100} height={100} />
              <span>{name}</span>
              <Link href={`/album/${id}`}>{">"}</Link>
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
  const res = await fetch(`${baseUrl}/artist/${id}`);
  const artist: Artist = await res.json();

  return {
    props: {
      artist,
    },
  };
}

export default Artist;
