import BackgroundPane from '@/components/BackgroundPane';
import Form from '@/components/Form';

const Register = () => {
  return (
    <BackgroundPane className="w-full h-full flex items-center justify-center shadow-xl border border-zinc-600">
      <Form mode="register" />
    </BackgroundPane>
  );
};

export default Register;
