import React, { useState, useCallback, useRef } from 'react';

import { View } from 'react-native';

import { useMutation } from '@apollo/react-hooks';

import ME_QUERY from 'graphql/queries/user/me';

import SIGN_IN_MUTATION from 'graphql/mutations/user/signIn';

import LoginForm from 'components/form/LoginForm';

import { setToken } from 'utils/tokenControl';

import onError from 'helpers/onError';

const SignIn = () => {
  const componentRef = useRef(null); // isMounted analog
  const [loading, setLoading] = useState(false);

  const onErrorHandler = useCallback(e => {
    if (componentRef?.current) {
      setLoading(false);
      onError(e);
    }
  }, [componentRef, setLoading]);

  const [signIn] = useMutation(
    SIGN_IN_MUTATION,
    {
      onError: onErrorHandler,
      update(cache, { data: { signIn: { token } } }) {
        if (componentRef?.current) {
          setToken(token);
        }
      },
      refetchQueries: [{ query: ME_QUERY }]
    }
  );

  const requestHandler = userData => {
    const { email, password } = userData;

    setLoading(true);

    signIn({ variables: { data: { email, password } } });
  };

  return (
    <View ref={componentRef}>
      <LoginForm
        title='Sign In'
        name='SignIn'
        requestHandler={requestHandler}
        loading={loading}
      />
    </View>
  );
};

export default SignIn;
