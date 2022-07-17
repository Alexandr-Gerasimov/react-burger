import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import App from "../components/app/App";
import { useAuth } from '../services/auth';

export function Home() {
    return (
      <>
        <App />
      </>
    );
  }