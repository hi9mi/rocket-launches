import ContentLoader from 'react-content-loader';

const LaunchSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="150px"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="7" ry="7" width="100%" height="150px" />
    </ContentLoader>
  );
};

export { LaunchSkeleton };
