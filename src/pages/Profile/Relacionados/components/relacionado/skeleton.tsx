import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Container } from './styles';

const SkeletonRelacionado: React.FC = () => {
  return (
    <Container available>
      <SkeletonTheme color="#999591" highlightColor="#444">
        <section className="body">
          <div className="headerDiv">
            <Skeleton circle height={60} width={60} />
            <div className="icon-container">
              <div className="icons" />
            </div>
          </div>
          <h2>
            <Skeleton width="100%" />
          </h2>
          <p>
            <Skeleton width="100%" />
          </p>
          <p>
            <div>
              <span>
                <Skeleton width="100%" />
              </span>
            </div>
          </p>
          <p>
            <Skeleton width="100%" />
          </p>
        </section>
      </SkeletonTheme>
    </Container>
  );
};
export default SkeletonRelacionado;
