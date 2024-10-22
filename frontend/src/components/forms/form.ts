import styled from "styled-components"

export const FormWrapper = styled.div`
  animation: form-appear 250ms;

  @keyframes form-appear {
    from {
      opacity: 0;
      transform: translateY(50px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`
