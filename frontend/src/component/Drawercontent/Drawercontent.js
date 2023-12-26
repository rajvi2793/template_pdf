import {
  Box,

  Input,
  InputGroup,
  InputRightElement,

} from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import React from "react";
import "./drawercontent.css";
function Drawercontent() {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <div className="log-container">
      <form className="form-controllers">
        <Box>
          <span>Email</span>
          <Input
            pr="4.5rem"
            value={value}
            onChange={handleChange}
            placeholder="Enter Email"
            size="md"
          />
          <br></br>
          {/* ---------Password ------------ */}
          <span>Password</span>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <div className="icon-container">
                <span
                  onClick={handleClick}
                  className={`icon ${show ? "visible" : "invisible"}`}
                >
                  {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
            </InputRightElement>
          </InputGroup>
          <br></br>
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </Box>
      </form>
    </div>
  );
}

export default Drawercontent;
