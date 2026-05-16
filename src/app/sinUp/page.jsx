"use client";
import { authClient } from "@/lib/auth-client";
import {Check, GeoPolygons} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { error } from "better-auth/api";
import { GoalIcon, RectangleGogglesIcon } from "lucide-react";
import Link from "next/link";


const SinUpPage = () => {
    const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(new FormData(e.currentTarget));
    const { data, error } = await authClient.signUp.email({
    name: user.name, // required
    email: user.email, // required
    password: user.password, // hmdashdat25@gmail.com
   
});
     console.log(data, error)
  };
    return (
       <div className="p-5 bg-white shadow w-fit mx-auto mt-4">
        <h2 className="text-3xl text-center">Create Account</h2>
        <p className="text-center mt-2 opacity-50">Start your adventure with Wanderlust</p>
        <Form
      className="flex w-96 flex-col gap-4  mt-5"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >
      <TextField
        isRequired
        name="name"
        type="text"
        
      >
        <Label>Full Name</Label>
        <Input className={'rounded-none py-3 bg-gray-100'} placeholder="Enter Your Name" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input  className={'rounded-none py-3 bg-gray-100'}  placeholder= 'Enter Your mail' />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input  className={'rounded-none py-3 bg-gray-100'}  placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="">
        <Button className={'w-full rounded-none bg-sky-400'} type="submit">
          <Check />
          Create Account
        </Button>
        <div className="flex justify-center mt-2">
            <hr />
            <p>Or sing up with</p>
            <hr />
        </div>
        <Button  className={'w-full rounded-none bg-white border text-black  mt-2 '}>
           <GeoPolygons></GeoPolygons> Sign Up With Google
        </Button>
        <p className="text-center mt-4">Already have an account? <Link href={'/login'}>Sign In</Link></p>
      </div>
    </Form>
       </div>
    );
};

export default SinUpPage;