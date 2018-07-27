import checkPropTypes from 'check-prop-types';

export const findByTestAttr = (wrapper, val) =>
    wrapper.find(`[data-test="${val}"]`);

export const checkProps = (component, props) => {
    const propError = checkPropTypes(component.propTypes, props, 'prop', component.name);
    expect(propError).toBeUndefined();
};