const generateName = () => {
    const firstname = ["Adrian", "Agustn", "Alberto", "Alejandro", "Alexander", "Alexis", "Alonso", "Andres Felipe", "Angel", "Anthony", "Antonio", "Bautista", "Benicio", "Benjamn", "Carlos", "Carlos Alberto", "Carlos Eduardo", "Carlos Roberto", "Cear", "Cristobal", "Daniel", "David", "Diego", "Dylan", "Eduardo", "Emiliano", "Emmanuel", "Enrique", "Erik", "Ernesto", "Ethan", "Fabian", "Facundo", "Felipe", "Felix", "Felix Maria", "Fernando", "Francisco", "Francisco Javier", "Gabriel", "Gaspar", "Gustavo Adolfo", "Hugo", "Ian", "Iker", "Isaac", "Jacob", "Javier", "Jayden", "Jeremy", "Jeronimo", "Jesus", "Jesus Antonio", "Jesus Victor", "Joaquin", "Jorge", "Jorge  Alberto", "Jorge Luis", "Jose", "Jose Antonio", "Jose Daniel", "Jose David", "Jose Francisco", "Jose Gregorio", "Jose Luis", "Jose Manuel", "Jose Pablo", "Josue", "Juan", "Juan Angel", "Juan Carlos", "Juan David", "Juan Esteban", "Juan Ignacio", "Juan Jose", "Juan Manuel", "Juan Pablo", "Juan Sebastian", "Julio", "Julio Cesar", "Justin", "Kevin", "Lautaro", "Liam", "Lian", "Lorenzo", "Lucas", "Luis", "Luis Alberto", "Luis Emilio", "Luis Fernando", "Manuel", "Manuel Antonio", "Marco Antonio", "Mario", "Martin", "Mateo", "Matias", "Maximiliano", "Maykel", "Miguel", "Miguel  ngel", "Nelson", "Noah", "Oscar", "Pablo", "Pedro", "Rafael", "Ramon", "Raul", "Ricardo", "Rigoberto", "Roberto", "Rolando", "Samuel", "Samuel David", "Santiago", "Santino", "Santos", "Sebastian", "Thiago", "Thiago Benjamin", "Tomas", "Valentino", "Vicente", "Victor", "Victor Hugo"];
    const lastname = ["Garcia", "Gonzalez", "Rodriguez", "Fernandez", "Lopez", "Martinez", "Sanchez", "Perez", "Gomez", "Martin", "Jimenez", "Ruiz", "Hernandez", "Diaz", "Moreno", "Alvarez", "Muñoz", "Romero", "Alonso", "Gutierrez", "Navarro", "Torres", "Dominguez",
        "Vazquez", "Ramos", "Gil", "Ramirez", "Serrano", "Blanco", "Suarez", "Molina", "Morales", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marin", "Sanz", "Nuñez", "Iglesias", "Medina", "Garrido", "Santos", "Castillo", "Cortes", "Lozano", "Guerrero", "Cano", "Prieto", "Mendez", "Calvo", "Cruz", "Gallego", "Vidal", "Leon", "Herrera", "Marquez", "Peña", "Cabrera", "Flores", "Campos", "Vega", "Diez", "Fuentes", "Carrasco", "Caballero", "Nieto", "Reyes", "Aguilar", "Pascual", "Herrero", "Santana", "Lorenzo", "Hidalgo", "Montero", "Ibañez", "Gimenez", "Ferrer", "Duran", "Vicente", "Benitez", "Mora", "Santiago", "Arias", "Vargas", "Carmona", "Crespo", "Roman", "Pastor", "Soto", "Saez", "Velasco", "Soler", "Moya", "Esteban", "Parra", "Bravo", "Gallardo", "Rojas", "Pardo", "Merino", "Franco", "Espinosa", "Izquierdo", "Lara", "Rivas", "Silva", "Rivera", "Casado", "Arroyo", "Redondo", "Camacho", "Rey", "Vera", "Otero", "Luque", "Galan", "Montes", "Rios", "Sierra", "Segura", "Carrillo", "Marcos", "Marti", "Soriano", "Mendoza"];
    var rand_first = Math.floor(Math.random() * firstname.length);
    var rand_last = Math.floor(Math.random() * lastname.length);

    return (firstname[rand_first] + " " + lastname[rand_last])
}

const userName = generateName()

const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

describe('Buy process', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: 'https://automationexercise.com/category_products/1',
        }).as('products1-in')
        cy.intercept({
            method: 'GET',
            url: 'https://automationexercise.com/product_details/3'
        }).as('product-detail')
        cy.fixture('products.json').as('productsData')
    })
    it('Open page', () => {
        cy.visit('https://automationexercise.com/');
    })
    it('Add to cart', () => {
        cy.get(':nth-child(1) > .panel-heading > .panel-title > a > .badge > .fa').click()
        cy.get('#Women > .panel-body > ul > :nth-child(1) > a').click()
        cy.wait('@products1-in')
    })
    it('products page', () => {
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()
        cy.wait('@product-detail')
    })
    it('detail page', () => {
        cy.get('#quantity').clear().type('2')
        cy.get('#name').type(userName)
        cy.get('#email').type(userName + "@gmail.com")
        cy.get('@productsData').then(data => {
            const idNumber = randomNumber(0, 6)
            const detailText = data.find(producto => producto.id === idNumber)

            cy.get('#review').type(detailText.color)
        })
        cy.get('#button-review').click()
    })
})
