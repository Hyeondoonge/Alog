import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function CustomReactQueryDevtools(props: Parameters<typeof ReactQueryDevtools>[0]) {
  return (
    <div style={{ fontSize: 'medium' }}>
      <ReactQueryDevtools {...props} />
    </div>
  );
}

export * from '@tanstack/react-query-devtools';
export { CustomReactQueryDevtools as ReactQueryDevtools };
