import Link from "next/link";

const { FRONT_API_URL: baseUrl } = process.env;

type Artist = {
  id: string;
  name: string;
  url: string;
};

type ArtistObject = {
  [label: string]: Artist[];
};

type Props = {
  artistObject: ArtistObject;
};

const Artists = ({ artistObject }: Props) => {
  return (
    <div>
      {Object.entries(artistObject).map(([label, artists]) => {
        return (
          <div key={label}>
            <div>{label}</div>
            <div>
              {artists.map(({ id, name }) => {
                return (
                  <div key={id}>
                    <span>{name}</span>
                    <Link href={`/artist/${id}`}>{">"}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/artists`);
  const artistObject: ArtistObject = await res.json();

  return {
    props: {
      artistObject,
    },
  };
}

export default Artists;
