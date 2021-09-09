import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Card from './Card';
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Card />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
