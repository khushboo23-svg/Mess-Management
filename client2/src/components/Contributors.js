import React from 'react';
import styled, { keyframes } from 'styled-components';
import githubImg from '../images/github.png';
import linkedinImg from '../images/Linkedin.png';
import Footer from './Footer';
import bharat from '../images/bharat.jpg';
import khushboo from '../images/khushboo.jpg';
import '../css/dashboard.css';

// Define the keyframe animation
const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #001F3F;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
`;

const ContributorsContainer = styled.div`
  color: white;
  padding: 2rem;
  ${'' /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); */}
  text-align: center;
`;

const ImageStyled = styled.img`
  width: 180px;
  height: 180px;
  margin-bottom: 1rem;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const ContributorName = styled.h3`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const ContributionText = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const IconLink = styled.a`
  margin: 0 1rem;
  display: inline-block;
`;

const ContributorSection = styled.div`
  flex: 1;
  margin: 1rem;
`;

const ContributorsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Contributor = ({ name, contribution, linkedin, github, imageSrc }) => {
  return (
    <ContributorSection>
      <ImageStyled src={imageSrc} alt={name} />
      <ContributorName>{name}</ContributorName>
      <ContributionText>{contribution}</ContributionText>
      <div>
        <IconLink href={linkedin} target="_blank" rel="noopener noreferrer">
          <img src={linkedinImg} alt="LinkedIn" style={{ width: '30px', height: '30px' }} />
        </IconLink>
        <IconLink href={github} target="_blank" rel="noopener noreferrer">
          <img src={githubImg} alt="GitHub" style={{ width: '30px', height: '30px' }} />
        </IconLink>
      </div>
    </ContributorSection>
  );
};

const Contributors = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <ContributorsContainer>
          <h1 style={{ padding: '10px', background: "#001f5f",boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            Contributors Corner
          </h1>
          <ContributorsRow>
            <Contributor
              name="Bharat Adhikari"
              contribution="Backend Developer, Crafting Robust APIs and Data Management"
              linkedin="https://www.linkedin.com/in/bharat-adhikari-54968a1b5/"
              github="https://github.com/AdBharat14"
              imageSrc={bharat}
            />
            <Contributor
              name="Khushboo Kumari"
              contribution="React UI Design and Redux-Managed Data Integration"
              linkedin="https://www.linkedin.com/in/khushboo-kumari-4a29021ba/"
              github="https://github.com/khushboo23-svg"
              imageSrc={khushboo}
            />
            {/* Add more Contributor components as needed */}
          </ContributorsRow>
        </ContributorsContainer>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Contributors;
