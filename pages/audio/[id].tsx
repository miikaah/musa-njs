import type { GetServerSidePropsContext } from "next";

const { CORE_API_URL: baseUrl } = process.env;

type Audio = {
  metadata: {
    album: string;
    artist: string;
    title: string;
    year: string;
  };
};

type Props = {
  audio: Audio;
};

const Audio = ({ audio }: Props) => {
  const { metadata } = audio;
  const { album, artist, title, year } = metadata;

  console.log(audio);

  return (
    <>
      <div>
        <div>{artist}</div>
        <div>{album}</div>
        <div>{title}</div>
        <div>{year}</div>
      </div>
      <div>{JSON.stringify(metadata, null, 2)}</div>
    </>
  );
};

type Params = { id: string };

export async function getServerSideProps(context: GetServerSidePropsContext<Params>) {
  const { id } = context.params as Params;
  const res = await fetch(`${baseUrl}/audio/${id}`);
  const audio: Audio = await res.json();

  return {
    props: {
      audio,
    },
  };
}

export default Audio;
