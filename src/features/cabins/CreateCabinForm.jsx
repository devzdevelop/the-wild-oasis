import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

const FormRow2 = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function CreateCabinForm() {
	const queryClient = useQueryClient();
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;
	console.log('erros: ', errors);

	const { isPending: isCreating, mutate } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('New cabin successfully created');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
			reset();
		},
		onError: (err) => {
			toast.error('New cabin was not created');
		},
	});

	function onSubmit(data) {
		console.log(data);
		mutate({ ...data, image: data.image[0] });
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow
				label='Cabin name'
				error={errors?.name?.message && <Error>{errors?.name?.message}</Error>}
			>
				<Input
					type='text'
					id='name'
					{...register('name', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow
				label='Maximum capacity'
				error={
					errors?.maxCapacity?.message && (
						<Error>{errors?.maxCapacity?.message}</Error>
					)
				}
			>
				<Input
					type='number'
					id='maxCapacity'
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity must be aleast 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Regular price'
				error={
					errors?.regularPrice?.message && (
						<Error>{errors?.regularPrice?.message}</Error>
					)
				}
			>
				<Input
					type='number'
					id='regularPrice'
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity must be aleast 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Discount'
				error={
					errors?.discount?.message && (
						<Error>{errors?.discount?.message}</Error>
					)
				}
			>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) =>
							value <= getValues().regularPrice ||
							'Discount should be less than the regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label='Description for website'
				error={
					errors?.description?.message && (
						<Error>{errors?.description?.message}</Error>
					)
				}
			>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					{...register('description', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow2>
				<Label htmlFor='image'>Cabin photo</Label>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', { required: 'This field is required' })}
				/>
			</FormRow2>

			<FormRow2>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					type='reset'
				>
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow2>
		</Form>
	);
}

export default CreateCabinForm;

// some updates
