import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Skills = styled.div`
  ${tw`flex flex-wrap w-full`};
`;

export const Skill = styled.div`
  ${tw`w-full sm:w-1/1`};
`;

export const SkillMatrix = styled.div`
  ${tw`flex flex-wrap w-full`}
  ::after {
    content: '';
    display: table;
    clear: both;
  }
`;

export const SkillQuadrant = styled.div`
  width: 50%;
  min-height: 250px;
  padding: 10px;
  position: relative;

  :nth-of-type(1) {
    border-right: 1px dashed #667eea;
    ::before {
      content: 'backend';
      text-transform: uppercase;
      width: 100%;
      display: inline-block;
      text-align: center;
      font-weight: bold;
      color: gray;
      font-size: x-small;
    }
  }

  :nth-of-type(2) {
    ::before {
      content: 'frontend';
      text-transform: uppercase;
      width: 100%;
      display: inline-block;
      text-align: center;
      font-weight: bold;
      color: gray;
      font-size: x-small;
    }
  }

  :nth-of-type(3) {
    border-top: 1px dashed #667eea;
    border-right: 1px dashed #667eea;
    ::before {
      content: 'cloud';
      text-transform: uppercase;
      width: 100%;
      display: inline-block;
      text-align: center;
      font-weight: bold;
      color: gray;
      font-size: x-small;
    }
  }

  :nth-of-type(4) {
    border-top: 1px dashed #667eea;
    ::before {
      content: 'miscellaneous';
      text-transform: uppercase;
      width: 100%;
      display: inline-block;
      text-align: center;
      font-weight: bold;
      color: gray;
      font-size: x-small;
    }
  }
`;

export const SkillItem = styled.span`
  display: inline-block;
  color: #3c366b;
  border-color: #4fd1c5;
  border-width: 1px;
  padding: 0.4em 0.8em;
  border-radius: 2rem;
  font-size: ${({ s }) => `${Math.sqrt(s) / 7}rem`};
  margin: 5px 5px 3px 0;

  :hover {
    background: #4fd1c530;
  }
`;
