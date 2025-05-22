'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

const ShortUrlRedirectPage = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [targetUrl, setTargetUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrl = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/url/${id}`);
        if (!res.ok) {
          throw new Error(`Not found or error: ${res.status}`);
        }
        const data = await res.json();
        if (!data.originalUrl) {
          throw new Error('Original URL not found');
        }
        setTargetUrl(data.originalUrl);
      } catch (err) {
        setError(err.message || 'Failed to fetch URL');
        setTargetUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [id]);

  useEffect(() => {
    if (!targetUrl) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push(targetUrl);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetUrl, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!targetUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">404 - Not Found</h1>
          <p className="text-muted-foreground">
            The short link you visited does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-3xl font-semibold">Redirecting you...</h1>
        <p className="text-lg">
          You&#39;ll be redirected to{" "}
          <a href={targetUrl} className="text-blue-600 font-medium underline" target="_blank" rel="noopener noreferrer">
            {targetUrl}
          </a>{' '}
          in <span className="font-bold">{countdown}</span> second{countdown !== 1 ? 's' : ""}.
        </p>
        <p className="text-sm text-muted-foreground">
          If you&#39;re not redirected,{" "}
          <a
            href={targetUrl}
            className="text-blue-500 underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
          .
        </p>

      </div>
    </div>
  );
};

export default ShortUrlRedirectPage;
