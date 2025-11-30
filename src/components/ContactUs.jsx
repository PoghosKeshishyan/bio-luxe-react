export function ContactUs({ contact }) {

  return (
    <section id="contact">
      <div className="container">
        <h2 className="heading">
          <span>
            <p>{contact.heading}</p>
          </span>
          <div className="line"></div>
        </h2>

        <div className="box_map">
          {contact.map_image ? (
            <iframe src={contact.map_image} title="Map" />
          ) : (
            <p>No map available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
