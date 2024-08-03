import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.log(error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	// https://odzbwstwbxbppnhieyxf.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg?t=2024-08-02T20%3A20%3A35.860Z
	// 1. Create cabin
	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	console.log('New Cabin: ', newCabin);

	if (error) {
		console.log(error);
		throw new Error('Cabins could not be created');
	}

	// 2. Upload image
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image, {
			cacheControl: '3600',
			upsert: false,
		});

	// 3. Delete cabin if there was an error uploading image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.log.error(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}
	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);
	if (error) {
		console.log(error);
		throw new Error('Cabin could not be deleted');
	}
	console.log('Deleting Cabin Response Data: ', data);
	return data;
}
