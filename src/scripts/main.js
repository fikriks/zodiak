function main() {
	const getData = (data) => {
		fetch(
			`https://script.google.com/macros/exec?service=AKfycbw7gKzP-WYV2F5mc9RaR7yE3Ve1yN91Tjs91hp_jHSE02dSv9w&nama=${data.nama}&tanggal=${data.tgllahir}`
		)
			.then((response) => {
				return response.json();
			})
			.then((responseJson) => {
				if (responseJson.status === 'error') {
					showResponseMessage(responseJson.status);
				} else {
					renderHasil(responseJson);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const showResponseMessage = (message = 'Periksa koneksi internet anda') => {
		alert(message);
	};

	const renderHasil = (hasil) => {
		const hasilElement = document.querySelector('#hasil');
		hasilElement.innerHTML = ``;

		hasilElement.innerHTML = ` 
                <p>Nama : <a class="font-weight-bold">${hasil.data.nama}</a></p>
                <p>Tanggal Lahir : <a class="font-weight-bold">${hasil.data.lahir}</a></p>
                <p>Usia : <a class="font-weight-bold">${hasil.data.usia}</a></p>
                <p>Ulang Tahun :<a class="font-weight-bold"> ${hasil.data.ultah}</a></p>
                <p>Zodiak : <a class="font-weight-bold">${hasil.data.zodiak}</a></p>`;
	};

	document.addEventListener('DOMContentLoaded', () => {
		const nama = document.querySelector('#nama');
		const tgllahir = document.querySelector('#tgllahir');
		const buttonProses = document.querySelector('#buttonProses');
		const alert = document.querySelector('.alert-danger');

		document.querySelector('#card-hasil').style.display = 'none';
		alert.style.display = 'none';

		buttonProses.addEventListener('click', function() {
			let tgl = new Date(tgllahir.value).toLocaleDateString('id-ID');
			const ha = tgl.split('/').join('-');

			if (nama.value === '' || tgllahir.value === '') {
				alert.style.display = 'block';
				alert.innerHTML = `<p>Ada data yang belum di isi</p>`;
			} else {
				document.querySelector('#card-hasil').style.display = 'block';

				const data = {
					nama: nama.value,
					tgllahir: ha
				};
				getData(data);
				nama.value = '';
				tgllahir.value = '';
			}
		});
	});
}

export default main;
