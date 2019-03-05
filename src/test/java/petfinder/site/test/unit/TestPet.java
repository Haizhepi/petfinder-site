package petfinder.site.test.unit;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
/*import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;*/

import petfinder.site.common.pet.PetDao;
import petfinder.site.common.pet.PetDto;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

//@ContextConfiguration(locations = "classpath:application-context-test.xml")
//@RunWith(SpringJUnit4ClassRunner.class)

public class TestPet {

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
