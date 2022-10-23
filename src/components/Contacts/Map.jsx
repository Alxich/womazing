import React from "react";

function Map() {
  return (
    <div id="map" no-cart-title="Map with any point">
      <div className="container centered full-width full-height">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5374395.08980255!2d14.657120241146968!3d44.57736613068537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6196f9928ebb%3A0xb90f770693656e38!2sRome%2C%20Metropolitan%20City%20of%20Rome%2C%20Italy!5e0!3m2!1sen!2suk!4v1664538846275!5m2!1sen!2suk"
          style={{ border: 0, width: "100%", height: "100%" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Map;
