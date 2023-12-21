import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getModel, clearErrors } from "../../actions/modelAction";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { error, models } = useSelector((state) => state.models);
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getModel());
  }, [dispatch, error]);

  const handleSuggestionClick = (modelId) => {
    navigate(`/model/${modelId}`);
  };
  const handleInputChange = (e, value) => {
    setKeyword(value);
  };

  return (
    <div className="flex h-[3rem] justify-between items-center px-4">
      <Autocomplete
        options={models}
        getOptionLabel={(option) => option.model}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for mobiles"
            variant="outlined"
            value={keyword}
            sx={{ padding: "0" }}
          />
        )}
        onChange={(e, value) => handleInputChange(e, value)}
        onInputChange={(e, value) => handleInputChange(e, value)}
        renderOption={(props, option) => (
          <li {...props} onClick={() => handleSuggestionClick(option._id)}>
            {option.model}
          </li>
        )}
      />
    </div>
  );
};

export default Search;
