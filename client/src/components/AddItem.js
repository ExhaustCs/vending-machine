import React from 'react';

export const AddItem = () => {
  return (
    <div>
      <form>
        <fieldset>
          <label>
            description
            <input placeholder='chips' />
          </label>
          <label>
            cost
            <input placeholder='0.00' />
          </label>
          <label>
            quantity
            <input placeholder='15' />
          </label>
        </fieldset>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
