"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    const { data, error } = await authClient.signUp.email({
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
      // image, // User image URL (optional)
      // callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        alert("success");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    });
  }

  const onLogin = async () => {
    const { data, error } = await authClient.signIn.email({
      email, // user email address
      password, // user password -> min 8 characters by default
    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        alert("success");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    });
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>

  );
}
