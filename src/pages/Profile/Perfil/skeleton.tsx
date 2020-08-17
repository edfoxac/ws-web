/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FormLayout, FormGrpup, FormTitle } from './styles';

const SkeletonPerfil: React.FC = () => {
  return (
    <>
      <>
        <FormTitle>
          <SkeletonTheme color="#999591" highlightColor="#444">
            <Skeleton width="20%" height={20} />
          </SkeletonTheme>
        </FormTitle>
        <FormLayout>
          <FormGrpup>
            <SkeletonTheme color="#999591" highlightColor="#444">
              <Skeleton width="100%" height={50} />
            </SkeletonTheme>
          </FormGrpup>
          <FormGrpup>
            <SkeletonTheme color="#999591" highlightColor="#444">
              <Skeleton width="100%" height={50} />
            </SkeletonTheme>
          </FormGrpup>
          <FormGrpup>
            <SkeletonTheme color="#999591" highlightColor="#444">
              <Skeleton width="100%" height={50} />
            </SkeletonTheme>
          </FormGrpup>
        </FormLayout>
        <FormLayout>
          <FormGrpup>
            <SkeletonTheme color="#999591" highlightColor="#444">
              <Skeleton width="100%" height={50} />
            </SkeletonTheme>
          </FormGrpup>
          <FormGrpup>
            <SkeletonTheme color="#999591" highlightColor="#444">
              <Skeleton width="100%" height={50} />
            </SkeletonTheme>
          </FormGrpup>
          <FormGrpup>
            <SkeletonTheme color="#999591" highlightColor="#444">
              <Skeleton width="100%" height={50} />
            </SkeletonTheme>
          </FormGrpup>
        </FormLayout>
      </>
    </>
  );
};
export default SkeletonPerfil;
