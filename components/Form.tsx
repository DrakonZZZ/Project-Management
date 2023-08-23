'use client';

import Card from './Card';
import Input from './Input';
import Button from './Button';
import { useState } from 'react';
import { register, signin } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const registerOption = {
  url: '/signin',
  text: 'Have an account?',
  header: 'Create an account',
  subheader: 'Just get started in few steps',
  buttontext: 'Register',
};

const signinOption = {
  url: '/register',
  text: "Don't have an account?",
  header: 'Welcome back',
  subheader: 'Enter your credentials to access your account',
  buttontext: 'Signin',
};

const initial = { firstName: '', lastName: '', email: '', password: '' };

const Form = ({ mode }) => {
  const [formData, setFormData] = useState(initial);
  const [error, setError] = useState('');

  const Router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'register') {
        await register(formData);
      } else {
        await signin(formData);
      }
    } catch (error) {
      setError(`Could not ${mode}`);
      console.log(error);
    } finally {
      setFormData(initial);
    }
    Router.replace('/home');
  };

  const content = mode === 'register' ? registerOption : signinOption;

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-white font-semibold text-5xl mb-5">
            {content.header}
          </h2>
          <p className="tex-lg text-white/50">{content.subheader}</p>
        </div>
        <form onSubmit={submitHandler} className="py-10 w-full">
          {mode === 'register' && (
            <div className="flex mb-4 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-2 ml-2 text-white/70">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-2 ml-2 text-white/70">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <div className="text-lg mb-2 ml-2 text-white/70">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formData.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-2 ml-2 text-white/70">Password</div>
            <Input
              required
              value={formData.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link href={content.url} className="text-green-600 font-bold">
                  {content.text}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary" size="medium">
                {content.buttontext}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Form;
