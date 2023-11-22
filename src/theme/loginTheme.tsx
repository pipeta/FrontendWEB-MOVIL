import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    height: 600,
    marginBottom: 50,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  subtitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    alignSelf: "center",
  },
  label: {
    marginTop: 25,
    color: "white",
    fontWeight: "bold",
  },

  inputField: {
    color: "white",
    fontSize: 20,
    borderWidth: 0,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  inputFieldIOS: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: "#5566ff",
    borderWidth: 2,
    borderColor: "#5566ff",
    paddingHorizontal: 100,
    paddingVertical: 14,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  newUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  newUserTextContainer: {
    backgroundColor: "#5566ff",
    borderWidth: 2,
    borderColor: "#5566ff",

    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",

    marginLeft: 50,
  },

  buttonReturn: {
    position: "absolute",
    top: 50,
    left: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  resetButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  resetButtonText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 16,
  },
  createAccountText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  signUpButton: {
    backgroundColor: "#800080",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  signUpButtonText: {
    color: "#5566ff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  confirmationContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  confirmationText: {
    color: "white",
    marginBottom: 10,
  },
  confirmationButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmationButton: {
    padding: 10,
    borderRadius: 5,
    width: "45%", // Ajusta el ancho según tus necesidades
    alignItems: "center",
    marginBottom:10
  },
  confirmationButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
