package petfinder.site.test.unit;


import org.junit.jupiter.api.Test;
import petfinder.site.common.pet.PetDto;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserDtoTest {

    @Test
    public void testPetDTO() {

        PetDto pet = new PetDto("Rufus", "Hamster", "hungry");

        String newPref = "stuffed";

        pet.setPreference(newPref);

        assertEquals(newPref, pet.getPreference());
    }

	/*@Autowired
	private PetDao petDAO;

	@Test
	@Transactional
	@Rollback(true)
	public void testAddPet() {

		PetDto pet = new PetDto("Rufus", "Hamster", "hungry");

		petDAO.save(pet);

		Optional<PetDto> optPet = petDAO.findPet(pet.getId());

		// pet was not saved properly
		if(!optPet.isPresent()) {
			fail();
		}

        // unwrap pet
		PetDto returnedPet = optPet.get();


		assertEquals(pet.getName(), returnedPet.getName());
		assertEquals(pet.getType(), returnedPet.getType());
		assertEquals(pet.getPreference(), returnedPet.getPreference());
		assertEquals(pet.getId(), returnedPet.getId());
	}
	*/
}
