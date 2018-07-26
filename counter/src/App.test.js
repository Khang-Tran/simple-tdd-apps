import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<App {...props}/>);
    if (state)
        wrapper.setState(state);
    return wrapper;

};

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

it('renders without crashing', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
});

it('renders increment button', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'increment-button');
    expect(appComponent.length).toBe(1);
});

it('renders counter display', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'counter-display');
    expect(appComponent.length).toBe(1);
});

it('has counter starts at 0', () => {
    const wrapper = setup();
    const initialState = wrapper.state('counter');
    expect(initialState).toEqual(0);
});

it('increases counter when clicking increase button', () => {
    const counter = 7;
    const wrapper = setup(null, {counter});
    const button = findByTestAttr(wrapper, 'increment-button');

    button.simulate('click');
    wrapper.update();

    const counterDisplay = findByTestAttr(wrapper, 'counter-display');

    expect(counterDisplay.text()).toContain(counter + 1);
});


it('decreases counter when clicking decrease button', () => {
    const counter = 10;
    const wrapper = setup(null, {counter});

    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();
    expect(wrapper.text()).toContain(counter - 1);
});

it('shows error when counting below 0', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});

    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    const error = findByTestAttr(wrapper, 'invalid-error');
    expect(error.length).toEqual(1);
});

it('removes error when the increment button is clicked', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});

    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
    wrapper.update();

    const incrementButton = findByTestAttr(wrapper, 'increment-button');
    incrementButton.simulate('click');

    wrapper.update();
    const error = findByTestAttr(wrapper, 'invalid-error');

    expect(error.length).toEqual(0);
});