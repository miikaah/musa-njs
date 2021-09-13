const { FRONT_API_URL: baseUrl } = process.env;

type Artist = {
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
              {artists.map(({ name, url }) => {
                return (
                  <div key={url}>
                    <a href={url}>{name}</a>
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
