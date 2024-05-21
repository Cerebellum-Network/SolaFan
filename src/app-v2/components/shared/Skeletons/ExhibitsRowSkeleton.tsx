import {Skeleton} from '../../primitives/Skeleton';

export const ExhibitsRowSkeleton = () => {
  const skeletonsCount = 1;
  const skeletons: number[] = Array.from(new Array(skeletonsCount)).fill(0);

  return (
    <div className="flex gap-8 pb-8">
      {skeletons.map((_, index) => (
        <Skeleton
          key={`key=${index}`}
          variant="rect"
          height={400}
          className="relative w-[271px] md:w-[380px] overflow-hidden"
        />
      ))}
    </div>
  );
};
