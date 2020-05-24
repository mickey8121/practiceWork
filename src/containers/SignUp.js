import React, { useState, useCallback, useRef } from 'react';
import { View } from 'react-native';

import { useMutation } from '@apollo/react-hooks';

import ME_QUERY from 'graphql/queries/user/me';

import SIGN_UP_MUTATION from 'graphql/mutations/user/signUp';

import LoginForm from 'components/form/LoginForm';

import { setToken } from 'utils/tokenControl';

import onError from 'helpers/onError';

const SignUp = () => {
  const componentRef = useRef(null); // isMounted analog
  const [loading, setLoading] = useState(false);

  const onErrorHandler = useCallback(e => {
    if (componentRef?.current) {
      setLoading(false);
      onError(e);
    }
  }, [componentRef, setLoading]);

  const [signUp] = useMutation(
    SIGN_UP_MUTATION,
    {
      onError: onErrorHandler,
      update(cache, { data: { signUp: { token } } }) {
        if (componentRef?.current) {
          setToken(token);
        }
      },
      refetchQueries: [{ query: ME_QUERY }]
    }
  );

  const requestHandler = userData => {
    const { name, email, password } = userData;

    setLoading(true);

    signUp({ variables: { data: { name, email, password } } });
  };

  return (
    <View ref={componentRef}>
      <LoginForm
        title='Sign Up'
        name='SignUp'
        requestHandler={requestHandler}
        loading={loading}
      />
    </View>
  );
};

export default SignUp;
