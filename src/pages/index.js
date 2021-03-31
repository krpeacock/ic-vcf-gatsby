import * as React from "react";
import styled from "styled-components";
import vCard from "vcf";

// styles
const Main = styled.main`
  color: "#232129";
  padding: 96;
  font-family: "-apple-system, Roboto, sans-serif, serif";
  width: fit-content;

  fieldset,
  label {
    display: flex;
    flex-direction: column;
  }
  input {
    min-width: 280px;
    width: fit-content;
  }
`;

const ProfilePicture = styled.picture`
  display: flex;
  width: 256px;
  img {
    width: 100%;
  }
`;

const DataList = styled.dl`
  display: grid;
  grid-template-columns: auto auto;
  dt,
  dd {
    /* width: fit-content; */
    display: inline-flex;
    border: 1px solid black;
    padding: 4px;
    margin: 0;
    padding-right: 16px;
  }
  picture,
  image {
    max-width: 75px;
  }
`;

const ContactCard = ({ card }) => {
  if (!card || !card.data) return null;
  return (
    <section>
      <DataList>
        {Object.entries(card.data).map(([key, value]) => {
          const [_field, _data] = value;
          console.log(value);
          if (value._field === "photo") {
            return (
              <React.Fragment key={value._field}>
                <dt>{value._field}</dt>
                <dd>
                  <ProfilePicture>
                    <img
                      style={{ maxWidth: "75px" }}
                      src={atob(value._data)}
                      alt="profile"
                    />
                  </ProfilePicture>
                </dd>
              </React.Fragment>
            );
          } else {
            return (
              <>
                <dt>{value._field}</dt>
                <dd>{value._data}</dd>
              </>
            );
          }
        })}
      </DataList>
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(
          card.toString()
        )}`}
        download="contact.vcf"
      >
        Download VCF
      </a>
    </section>
  );
};

// markup
const IndexPage = () => {
  const [image, setImage] = React.useState("");
  const [card, setCard] = React.useState(null);
  const [actor, setActor] = React.useState(null);

  React.useEffect(() => {
    import("../actor").then((module) => {
      setActor(module.default);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const card = new vCard();
    const inputs = e.target.querySelectorAll("input");
    const email = e.target.querySelector('input[name="email"]').value;
    inputs.forEach((input) => {
      if (input.name === "photo") return;
      else if (input.name === "n") {
        // Take full input and format for vcf
        const names = input.value.split(" ");
        const arr = new Array(5);

        names.reverse().forEach((name, idx) => {
          arr[idx] = name;
        });

        card.add("fn", input.value);
        card.add(input.name, arr.join(";"));
      } else {
        card.add(input.name, input.value);
      }
    });
    card.add("photo", btoa(image), { mediatype: "image/gif" });

    actor?.set(email, JSON.stringify(card.toJSON())).then(() => {
      alert("card uploaded!");
      inputs.forEach((input) => {
        input.value = "";
      });
      setImage("");
    });

    return false;
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function getCard(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[name="emailsearch"]').value;

    actor?.get(email).then((returnedCard) => {
      if (!returnedCard.length) {
        return alert("No contact found for that email");
      }
      setCard(vCard.fromJSON(returnedCard[0]));
      console.log(returnedCard);
    });
    return false;
  }

  return (
    <Main>
      <title>Contact Book</title>
      <h1>Internet Computer Address Book</h1>
      <section>
        <h2>Look up a contact by email</h2>
        <form onSubmit={getCard}>
          <label htmlFor="emailsearch">
            <input type="email" name="emailsearch" id="emailsearch" />
          </label>
          <button type="submit">Search</button>
        </form>
      </section>
      {/* Card Display */}
      <ContactCard card={card} />

      <form onSubmit={handleSubmit}>
        <h2>Add a Contact</h2>
        <fieldset>
          <h3>Personal Information</h3>
          <label htmlFor="n">
            Full Name
            <input type="text" name="n" autoComplete="name" />
          </label>
          <label htmlFor="org">
            Organziation
            <input type="text" name="org" autoComplete="organization" />
          </label>
          <label htmlFor="title">
            Title
            <input type="text" name="title" autoComplete="organization-title" />
          </label>
        </fieldset>
        <fieldset>
          <h3>Profile photo</h3>
          <label htmlFor="photo">
            Upload an image
            <input
              type="file"
              id="img"
              name="photo"
              accept="image/*"
              onChange={handleUpload}
            />
          </label>
          {image ? (
            <ProfilePicture>
              <img src={image} alt="user-uploaded profile image" />
            </ProfilePicture>
          ) : null}
        </fieldset>
        <fieldset>
          <h3>Contact</h3>
          <label htmlFor="tel">
            Phone number
            <input type="text" name="tel" />
          </label>
          <label htmlFor="adr">
            Address
            <input type="text" name="adr" autoComplete="on" />
          </label>
          <label htmlFor="email">
            Email
            <input required type="email" name="email" autoComplete="email" />
          </label>
        </fieldset>
        <button type="submit">Submit Contact</button>
      </form>
    </Main>
  );
};

export default IndexPage;
