import { GetServerSideProps } from 'next';
import { getSession } from '@/lib/auth/session';
import SignInForm from '@/components/auth/SignInForm';

export default function SignIn() {
  return <SignInForm />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession();

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};