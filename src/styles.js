import bgImage from "./images/batikbg.jpg";
const style = {
  formMaker: {
    position: "absolute",
    width: "500",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  inputLogin: {
    minWidth: 320
  },
  spinnerDiv: {
    width: 320
  },
  inputRegister: {
    minWidth: "320"
  },
  spinnerLogin: {
    width: "3rem",
    height: "3rem",
    left: "50%"
  },
  buttonLogin: {
    minWidth: "320px"
  },
  buttonCheckout: {
    marginTop: "10px",
    width: "95%",
    marginBottom: "10px"
  },
  buttonRegister: {
    marginTop: "10px",
    minWidth: "320px"
  },
  columnNav: {
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  columnCardPict: {
    marginBottom: "20px"
  },
  buttonSidebar: {
    marginBottom: "10px",
    paddingLeft: "0px",
    paddingRight: "0px",
    width: "100%"
  },
  cartDiv: {
    paddingTop: "10px",
    paddingLeft: "10px",
    minHeight: "100%",
    display: "inline-block",
    width: "100%",
    border: "1px solid rgba(0,0,0,.125)",
    borderRadius: "8px",
    backgroundColor: "#ffffff"
  },
  cartItem: {
    marginBottom: "10px",
    marginRight: "10px",
    border: "1px solid rgba(0,0,0,.125)",
    borderRadius: ".25rem",
    height: "80px",
    width: "80px"
  },
  incrementCart: {
    marginBottom: "10px",
    marginRight: "10px",
    borderRadius: ".25rem",
    height: "80px",
    width: "120px"
  },
  buttonAddProduct: {
    marginBottom: "10px",
    marginTop: "10px"
  },
  buttonNavbar: {
    textAlign: "center",
    textDecoration: "none"
  },
  backGroundStyle: {
    backgroundImage: `url(${bgImage})`
  },
  centerCentered: { verticalAlign: "middle", textAlign: "center" },
  verticalCentered: { verticalAlign: "middle" },
  closeCartButton: { verticalAlign: "middle", align: "left" },
  alignRight: { align: "right", textAlign: "right" },
  tHead: {
    backgroundColor: "#5a6268",
    color: "white",
    borderColor: "#5a6268"
  }
};

export default style;
