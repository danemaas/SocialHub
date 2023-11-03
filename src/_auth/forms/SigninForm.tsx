"user client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SigninValidationSchema } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useSigninAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "../../context/authContext";

const SigninForm = () => {
  const [passwordReveal, setPasswordReveal] = useState(false);
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signinAccount, isPending: isSigningIn } =
    useSigninAccount();

  const form = useForm<z.infer<typeof SigninValidationSchema>>({
    resolver: zodResolver(SigninValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidationSchema>) {
    if (passwordReveal) setPasswordReveal(!passwordReveal);

    const session = await signinAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Sign in failed.",
        description: "There was a problem in signing in. Please try again",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        variant: "destructive",
        title: "Uh oh! Sign in failed.",
        description: "There was a problem signing in. Please try again",
      });
    }
  }

  const toggleRevealPassword = () => {
    setPasswordReveal(!passwordReveal);
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex justify-center items-center gap-1">
          <img
            src="/assets/images/logo.png"
            alt="SocialHub logo"
            className="w-10 h-15"
          />
          <h2 className="font-bold text-3xl">SocialHub</h2>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign In to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={`${passwordReveal ? "text" : "password"}`}
                      className="shad-input"
                      {...field}
                    />
                    <AiOutlineEye
                      onClick={toggleRevealPassword}
                      className="absolute right-2 top-[10px] w-7 h-7 cursor-pointer"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-sm-regular text-light-2 text-center mt-2">
            New to SocialHub?{" "}
            <Link to="/sign-up" className="text-primary-500">
              Sign Up
            </Link>{" "}
            now
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
