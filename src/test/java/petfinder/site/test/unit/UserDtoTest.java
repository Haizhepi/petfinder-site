package petfinder.site.test.unit;

import alloy.util._Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import petfinder.site.common.user.UserDto;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class UserDtoTest {
    private UserDto user = null;

    @BeforeEach
    void init() {
        user = new UserDto("1@test.com", _Lists.list("ROLE_USER"),
                "Yunzhe", "Liu", "Male", "78787", UserDto.UserType.OWNER, null, "Mars", "haha");
    }

    @Test
    void testType() {
        assertEquals(this.user.getType(), UserDto.UserType.OWNER);
    }
}
