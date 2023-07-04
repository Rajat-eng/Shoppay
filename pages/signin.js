import Header from "../components/header";
import Footer from "../components/footer";
import DotLoaderSpinner from "../components/dotLoader";
import { useState } from "react";
import styles from "../styles/SignIn.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../components/inputs/loginInput";
import CircledIconBtn from "../components/buttons/circledIconBtn";
import { getProviders, signIn, getSession, getCsrfToken } from "next-auth/react";
import Router from "next/router";


const Signin = ({ data, providers,callbackUrl,csrfToken }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",
    login_error: "",
  });

  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const loginValidation = Yup.object().shape({
    login_email: Yup.string()
      .required("Email address is required")
      .email("please enter a valid email address"),
    login_password: Yup.string().required("please enter a password"),
  });

  async function signInHandler(){
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    if (res?.error) {
      setLoading(false)
      setUser({ ...user, login_error: res?.error });
    }else{
      setLoading(false)
      Router.push(callbackUrl || "/")
    }
  }

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });


  const signUpHandler=async ()=>{
    try {
      setLoading(true)
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setUser({...user,success:"",error:error.response.data.message})
    }
  }

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country={data} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              {" "}
              We wouldd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={()=>{
                signInHandler()
              }}
            >
              {(formik) => {
                const { errors, touched, isValid, dirty } = formik;
                return (
                  <Form method="post" action="/api/auth/signin/email">
                    <input type="hidden" defaultChecked={csrfToken} name="csrfToken"></input>
                    <LoginInput
                      icon="email"
                      type="email"
                      name="login_email"
                      value={user.login_email}
                      placeholder="Enter email Address"
                      onChange={handleChange}
                    />
                    <LoginInput
                      icon="password"
                      type="password"
                      name="login_password"
                      value={user.login_password}
                      placeholder="Enter password"
                      onChange={handleChange}
                    />
                    <CircledIconBtn type="submit" text="Sign In" />
                    {login_error && (
                        <span className={styles.error}>{login_error}</span>
                    )}
                    <div className={styles.forgot}>
                      <Link href="/auth/forgot">Forgor password</Link>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* signup */}
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country={data} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession(context);
  const { callbackUrl='/' } = query;

  if (session) {
    return {
      redirect: {
        permanent:false,
        destination: callbackUrl,
      },
    };
  }

  const providers = Object.values(await getProviders());
  const csrfToken=await getCsrfToken(context);
  return {
    props: {
      providers,
      callbackUrl,
      csrfToken
    },
  };
}

export default Signin;
